import Header from "../UI/Header";
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import usePostData from "../../hooks/usePostData";
import { useEffect } from "react";

const RoomView: React.FC = () => {
  const { id } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();
  const [_postTransactionsResponse, isPosted, _isPostedError, doPost] =
    usePostData(
      `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms/${id}/transactions.json`,
      "PUT"
    );

  const [roomData, isRoomDataLoaded, _isRoomDataError, doFetch] = useFetchData(
    `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/rooms/${id}.json`
  );

  const [fetchedUserNames, isUsernamesLoaded, , ,] = useFetchData(
    `https://expensesapp-a0382-default-rtdb.europe-west1.firebasedatabase.app/users.json`
  );

  useEffect(
    () => setIsLoaded(isRoomDataLoaded && isUsernamesLoaded),
    [isRoomDataLoaded, isUsernamesLoaded]
  );

  useEffect(() => {
    doFetch((prev) => !prev);
    console.log("isPosted", isPosted);
  }, [isPosted]);

  const summarizeRoomHandler = () => {
    const usersBalance: any = {};

    for (const [key, value] of Object.entries<any>(roomData.expenses)) {
      usersBalance[value.owner]
        ? (usersBalance[value.owner] =
            +usersBalance[value.owner] + +value.amount)
        : (usersBalance[value.owner] = +value.amount);
      for (const [ekey, evalue] of Object.entries<any>(value.users)) {
        console.log(evalue);
        usersBalance[ekey]
          ? (usersBalance[ekey] = +usersBalance[ekey] - evalue)
          : (usersBalance[ekey] = -evalue);
      }
    }
    const transactions = [];

    let sortedBalance = Object.entries(usersBalance)
      .sort((_key, value) => Math.abs(+value))
      .reverse()
      .filter((user) => +user[1] !== 0);
    console.log(sortedBalance);
    while (sortedBalance.length !== 0) {
      const balanceLen = sortedBalance.length - 1

      const transaction = {
        from:
          +sortedBalance[0][1] > 0
            ? sortedBalance[balanceLen][0]
            : sortedBalance[0][0],
        to:
          +sortedBalance[0][1] > 0
            ? sortedBalance[0][0]
            : sortedBalance[balanceLen][0],
        amount: Math.abs(+sortedBalance[0][1]),
        isPaid: false,
      };
      console.log(transaction)
      transactions.push(transaction);
      sortedBalance[balanceLen][1] =
        +sortedBalance[balanceLen][1] + +sortedBalance[0][1];
      sortedBalance[0][1] = 0;
      sortedBalance = sortedBalance
        .sort((_key, value) => Math.abs(+value))
        .reverse()
        .filter((user) => +user[1] !== 0);
    }
    doPost(transactions);
  };

  return isLoaded ? (
    <>
      <Header
        first={{
          symbol: ":",
          onClick: summarizeRoomHandler,
        }}
        second={{
          symbol: "+",
          onClick: () => {
            navigate(`/${id}/newexpense`);
          },
        }}
      >
        {roomData.name}
      </Header>
      <ExpensesList users={fetchedUserNames} roomData={roomData} roomID={id} />
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default RoomView;
