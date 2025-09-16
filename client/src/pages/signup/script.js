fetch("../../components/signupForm/index.html")
    .then((signupForm) => signupForm.text())
    .then((signupForm) => {
        document.getElementById("signup").innerHTML = signupForm;
        const script = document.createElement("script");
        script.type = "module";
        script.src = "../../components/signupForm/script.js";
        document.body.appendChild(script);
    })
    .catch((error) => {
        console.error("Error while fetching signupForm \n", error);
    });
