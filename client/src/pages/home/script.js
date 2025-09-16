import { fetchNavBar, getFooter } from "../../helper/component.js";
import toast from "../../components/toast/script.js";

fetchNavBar();
(async () => {
    await fetch("../../components/content/index.html")
        .then((content) => content.text())
        .then(
            (content) =>
                (document.getElementById("content").innerHTML = content),
        )
        .catch((err) => console.error("Error while fetching content \n", err));

    const script = document.createElement("script");
    script.type = "module";
    script.src = "../../components/content/script.js";
    document.body.appendChild(script);
})();

getFooter();

const params = new URLSearchParams(window.location.search);
// remove the params
const url = new URL(window.location.href);
url.search = "";
window.history.replaceState({}, document.title, url); // more explicit

if (params.get("success")) {
    switch (params.get("success")) {
        case "google-callback":
            toast({
                status: true,
                message: "Successfully Sign In With Google",
            });
            break;
        case "github-callback":
            toast({
                status: true,
                message: "Successfully Sign In With GitHub",
            });
            break;
        case "register":
            toast({ status: true, message: "Successfully Created Account" });
            break;
        case "login":
            toast({ status: true, message: "Successfully Logged In" });
            break;
        case "log-out":
            toast({ status: true, message: "Successfully Logged Out" });
            break;
    }
} else if (params.get("error")) {
    switch (params.get("error")) {
        case "no-google-code":
            toast({ status: false, message: "Failed To Sign In With GitHub" });
            break;
        case "no-gitub-code":
            toast({ status: false, message: "Failed To Sign In With GitHub" });
            break;
        case "no-email":
            toast({ status: false, message: "Email is required" });
            break;
        case "account-already-exists":
            toast({ status: false, message: "Account Already Exists" });
            break;
        case "invalid-register-id":
            toast({
                status: false,
                message: "Register Session Expired, Try Again",
            });
            break;
        default:
            toast({ status: false, message: "Somethign Went Wrong" });
    }
}
