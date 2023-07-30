const formElement = document.querySelector(".form");
const headerBtnElement = document.querySelector(".header-btn");
const factsListContainer = document.querySelector(".facts-list");
const asideContainer = document.querySelector(".aside");
// hide and show logic to hide/show from

headerBtnElement.addEventListener("click", function () {
  if (formElement.classList.contains("hidden") == true) {
    formElement.classList.remove("hidden");
    headerBtnElement.textContent = "Close";
  } else {
    formElement.classList.add("hidden");
    headerBtnElement.textContent = "Share a fact";
  }
});

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

//get data from server

async function fetchdata() {
  let response = await fetch(
    "https://neadubejlykvyguixrlv.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lYWR1YmVqbHlrdnlndWl4cmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzMDk1OTcsImV4cCI6MjAwNTg4NTU5N30.LX0XVcTuDCCfnhsL6lZz9QauSohM3ZA7LOcwrbIyG5M",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lYWR1YmVqbHlrdnlndWl4cmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzMDk1OTcsImV4cCI6MjAwNTg4NTU5N30.LX0XVcTuDCCfnhsL6lZz9QauSohM3ZA7LOcwrbIyG5M",
      },
    }
  );
  let data = await response.json();
  console.log(data);
  setDatatoListContainer(data);
}

fetchdata();

//get filtered data from server

async function fetchFilteredData(category) {
  let response = await fetch(
    "https://neadubejlykvyguixrlv.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lYWR1YmVqbHlrdnlndWl4cmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzMDk1OTcsImV4cCI6MjAwNTg4NTU5N30.LX0XVcTuDCCfnhsL6lZz9QauSohM3ZA7LOcwrbIyG5M",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lYWR1YmVqbHlrdnlndWl4cmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzMDk1OTcsImV4cCI6MjAwNTg4NTU5N30.LX0XVcTuDCCfnhsL6lZz9QauSohM3ZA7LOcwrbIyG5M",
      },
    }
  );
  let data = await response.json();
  if (category === "All") {
    setDatatoListContainer(data);
  } else {
    let FilteredData = data.filter(function (obj) {
      return obj.category == category;
    });
    setDatatoListContainer(FilteredData);
  }
}

// set data to list contianer

function setDatatoListContainer(data) {
  data.innerHTML = "";

  htmlArray = data.map(function (ele) {
    return `<li class="fact">
    <div class="fact-content">
      <p>
      ${ele.text}
        <a href="${ele.source}" target="_blank">(Source)</a>
      </p>
    </div>

    <p class="tag" style="background-color:${
      CATEGORIES.find(function (cat) {
        return cat.name == ele.category;
      }).color
    }">${ele.category}</p>
    <div class="votebuttons">
      <button class="btn-vote">👍 ${ele.votesIntresting}</button>
      <button class="btn-vote">🤯 ${ele.votesMindblowing}</button>
      <button class="btn-vote">🎈 ${ele.votesFalse}</button>
    </div>
  </li>`;
  });

  let html = htmlArray.join("");

  factsListContainer.innerHTML = html;
}

//rendering buttons dynamically

asideContainer.innerHTML = "";

function renderButtons(categoryArray) {
  categoryArray.innerHTML = "";

  htmlArray = categoryArray.map(function (ele) {
    return `<button class="category btn" style="background-color: ${ele.color}">
    ${ele.name}
  </button>`;
  });

  let html = htmlArray.join("");

  asideContainer.innerHTML = html;
  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.classList.add("btn-all");
  allBtn.classList.add("btn");
  allBtn.classList.add("order-top");
  allBtn.classList.add("category");
  asideContainer.appendChild(allBtn);
}

renderButtons(CATEGORIES);

const allCategoryBtns = document.querySelectorAll(".category");
allCategoryBtns.forEach(function (btnEl) {
  btnEl.addEventListener("click", function (event) {
    console.log(event.target.textContent.trim());
    fetchFilteredData(event.target.textContent.trim());
  });
});
