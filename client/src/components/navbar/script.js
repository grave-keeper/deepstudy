import { handleLogOut } from "../../services/userService.js";

// set the profile info in the navbar-right
if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    document.querySelector(".navbar-right > li:first-child").style.display =
        "none";
    const div1 = document.querySelectorAll(".account");
    const div2 = document.querySelector(".profile-status");
    div1.forEach((div) => (div.style.display = "none"));
    div2.style.display = "flex";
    div2.querySelector("img:first-child").src = user.picture;
    div2.querySelector("p").innerText = user.name;
}

// check for user on click input on navbar-right
const dropdownToggle = document.querySelector(".navbar-right > div:last-child");
const dropdownMenu = document.querySelector(
    ".navbar-right > div:last-child > ul:last-child",
);

dropdownToggle.onclick = (event) => {
    event.stopPropagation();
    dropdownMenu.style.display =
        getComputedStyle(dropdownMenu).display === "none" ? "block" : "none";
};

document.addEventListener("click", (event) => {
    event.stopPropagation();
    // const isClickInside = dropdownToggle.contains(event.target)
    if (getComputedStyle(dropdownMenu).display === "block") {
        dropdownMenu.style.display =
            getComputedStyle(dropdownMenu).display === "none"
                ? "block"
                : "none";
    }
});

// listening to user logout click

const logOutBtn = document.querySelector(
    ".navbar-right > div:last-child > ul:last-child > .logout",
);

logOutBtn.onclick = (event) => {
    handleLogOut();
};

document
    .querySelector(".navbar-shift div:first-child li:first-child img ")
    .addEventListener("click", (e) => {
        e.stopPropagation();
        const el = document.querySelector(".navbar-shift > div:nth-child(2)");
        if (getComputedStyle(el).display === "none") {
            document.querySelector(
                ".navbar-shift > div:nth-child(2)",
            ).style.display = "flex";
            document.body.style.position = "fixed";
        } else {
            document.querySelector(
                ".navbar-shift > div:nth-child(2)",
            ).style.display = "none";
            document.body.style.position = "";
        }
    });

document
    .querySelector(".navbar-shift  .close")
    .addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelector(
            ".navbar-shift > div:nth-child(2)",
        ).style.display = "none";
        document.body.style.position = "";
    });
