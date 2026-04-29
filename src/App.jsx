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
  const [selectedFriend, setSeleectedFriend] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [addForm, setAddForm] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [imgURL, setImgURL] = useState("https://i.pravatar.cc/48");
  function handleSelect(id) {
    const friend = friends.find((friend) => friend.id === id);
    setSeleectedFriend(friend || null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFriends((prev) =>
      prev.map((friend) => {
        if (friend.id === Number(payer)) {
          return {
            ...friend,
            balance: friend.balance + Number(myExpense),
          };
        }
        if (payer === "you" && friend.id === selectedFriend.id) {
          return {
            ...friend,
            balance: friend.balance - Number(hisExpense),
          };
        } else {
          return friend;
        }
      }),
    );
    console.log(hisExpense);
    setBillValue(0);
    setMyExpense(0);
    setPayer("you");
  }

  function handleFriendSubmit(e) {
    e.preventDefault();
    setFriends((prev) => {
      const updated = [
        ...prev,
        {
          id: Math.floor(Math.random() * 1000000),
          name: friendName,
          image: imgURL,
          balance: 0,
        },
      ];

      console.log(updated);
      return updated;
    });
  }

  return (
    <div className="flex gap-10 p-10 w-[100%] mx-auto justify-center">
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col gap-4">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className={`flex gap-10 justify-between p-2 rounded transition
    ${selectedFriend?.id === friend.id ? "bg-orange-300" : "hover:bg-orange-200"}
  `}
            >
              <div className="flex gap-2">
                <img
                  src={friend.image}
                  alt="img"
                  className="rounded-full w-12 h-12"
                />

                <span>
                  <p>{friend.name}</p>
                  <p
                    className={`${friend.balance > 0 ? "text-red-600" : friend.balance < 0 ? "text-green-600" : "text-black"}`}
                  >
                    {friend.balance > 0
                      ? `You owe ${friend.name} ${Math.abs(friend.balance)}$`
                      : friend.balance < 0
                        ? `${friend.name} Owes you ${Math.abs(friend.balance)}$`
                        : "You are Even"}
                  </p>
                </span>
              </div>
              <button
                className="bg-orange-600 w-[100px] h-[30px] rounded-lg text-white"
                onClick={() => {
                  if (selectedFriend?.id === friend.id) {
                    handleSelect(null);
                    setFormOpen(false);
                  } else {
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
        {addForm && (
          <div className="flex flex-col gap-4 bg-orange-200 p-4 rounded-md">
            <form
              className="flex flex-col gap-10"
              onSubmit={handleFriendSubmit}
            >
              <div className="flex items-center gap-4">
                <label className="w-40">👫 Friend Name</label>
                <input
                  type="text"
                  className="border p-2 rounded-md flex-1"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-40">🌄 Image URL</label>
                <input
                  type="text"
                  className="border p-2 rounded-md flex-1"
                  value={imgURL}
                  onChange={(e) => setImgURL(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="w-40"></div>
                <button className="bg-orange-600 flex-1 h-[40px] rounded-lg text-white">
                  Add
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="flex gap-10 justify-between p-2">
          <div className="w-40"></div>
          <button
            className="bg-orange-600 w-[130px] h-[30px] rounded-lg text-white"
            onClick={() => setAddForm(!addForm)}
          >
            {addForm ? "Close" : "Add a Friend"}
          </button>
        </div>
      </div>
      {formOpen && (
        <div className="flex flex-col gap-4 bg-orange-200 p-4 rounded-md">
          <h1 className="text-xl font-bold">
            Split a Bill with {selectedFriend ? selectedFriend.name : ""}
          </h1>

          <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
              <label className="w-40">💰 Bill Value</label>
              <input
                type="text"
                className="border p-2 flex-1"
                value={billValue}
                onChange={(e) => setBillValue(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-40">🧍‍♀️Your Expense</label>
              <input
                type="text"
                className="border p-2 flex-1"
                value={myExpense}
                onChange={(e) => setMyExpense(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-40">
                👫 {selectedFriend?.name}'s Expense
              </label>
              <input
                type="text"
                className="border p-2 bg-gray-400 flex-1"
                value={hisExpense}
                readOnly
              />
            </div>

            <div className="flex items-center gap-4 ">
              <label className="w-40">🤑 Who is paying?</label>
              <select
                className="border p-2 flex-1"
                value={payer}
                onChange={(e) => setPayer(e.target.value)}
              >
                <option value="you">You</option>
                {selectedFriend && (
                  <option value={selectedFriend.id}>
                    {selectedFriend.name}
                  </option>
                )}
              </select>
            </div>
            <div className="flex gap-4">
              <div className="w-40"></div>
              <button className="bg-orange-600 flex-1 h-[40px] rounded-lg text-white">
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
