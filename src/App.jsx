import { use, useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [billValue, setBillValue] = useState(0);
  const [myExpense, setMyExpense] = useState(0);
  const hisExpense = Number(billValue) - Number(myExpense);
  const [payer, setPayer] = useState("you");
  const [selectedFriend, setSeleectedFriend] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  function handleSelect(id) {
    const friend = initialFriends.find((friend) => friend.id === id);
    setSeleectedFriend(friend);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFriends((prev) => prev.map((friend) => {
      if (friend.id === Number(payer)){
        return {
          ...friend, balance: friend.balance + Number(myExpense)
        };
      }
      if(payer === "you" && friend.id === selectedFriend.id){
        return{
          ...friend, balance: friend.balance - Number(hisExpense)
        }
      }
      else{
        return friend;
      }
    }))
    console.log(hisExpense);
    setBillValue(0);
setMyExpense(0);
setPayer("you");
  }

  function showForm(){

  }

  return (
    <div className="flex gap-10 p-10">
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col gap-4">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="flex gap-4 items-center hover:bg-orange-300 p-2 rounded"
            >
              <img
                src={friend.image}
                alt="img"
                className="rounded-full w-12 h-12"
              />

              <span>
                <p>{friend.name}</p>
                <p>{friend.balance > 0 ? `You owe ${friend.name} ${friend.balance}` : 
                friend.balance < 0 ? `${friend.name} Owes you ${friend.balance}` :
                "You are Even"}</p>
              </span>

              <button
                className="bg-orange-600 w-[60px] rounded-lg text-white"
                onClick={() => {
                  
                  if (selectedFriend?.id === friend.id){
                    handleSelect(null);
                  setFormOpen(false);
                  }
                  else{
                    handleSelect(friend.id);
                    setFormOpen(true);
                  }
                }}
              >
                {selectedFriend?.id === friend.id ? "Close" : "Select"}
              </button>
            </li>
          ))}
        </ul>

        <button className="bg-orange-600 w-[120px] rounded-lg text-white">
          Add Friend
        </button>
      </div>
        {formOpen && (
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">
          Split a Bill with {selectedFriend ? selectedFriend.name : ""}
        </h1>

        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="flex items-center gap-4">
            <label className="w-40">Bill Value</label>
            <input
              type="text"
              className="border p-2"
              value={billValue}
              onChange={(e) => setBillValue(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40">Your Expense</label>
            <input
              type="text"
              className="border p-2"
              value={myExpense}
              onChange={(e) => setMyExpense(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40">{selectedFriend.name} Expense</label>
            <input
              type="text"
              className="border p-2 bg-gray-400"
              value={hisExpense}
              readOnly
            />
          </div>

          <div className="flex items-center gap-4 ">
            <label className="w-40">Who is paying?</label>
            <select className="border p-2 flex-1" value={payer} onChange={(e) => setPayer(e.target.value)}>
              <option value="you">You</option>
              {selectedFriend && (
              <option value={selectedFriend.id}>
                {selectedFriend.name}
              </option>
              )}
            </select>
          </div>
          <button className="bg-orange-600 w-[120px] rounded-lg text-white">
            Split Bill
          </button>
        </form>
      </div>
        )}
    </div>
  )
;
}

export default App;
