$(function () {
    const form = $(`#contact-form`);
    const fullNameEl = form.find(`input[id="full_name"]`);
    const emailEl = form.find(`input[id="email_address"]`);
    const messageEL = form.find(`textarea[name="message"]`);
    const result = form.find(`p.result`);

    function displayError(child) {
        const parent = child.closest(".form-control");
        parent.attr("data-has-error", "");
    }

    form.on("submit", (e) => {
        e.preventDefault();
        const formControls = form.find(".form-control");
        formControls.removeAttr("data-has-error");
        const formData = Object.fromEntries(new FormData(e.target));
        const { full_name, message, email_address } = formData;

        if (!full_name.trim()) {
            displayError(fullNameEl);
            return;
        }

        if (!email_address.trim()) {
            displayError(emailEl);
            return;
        }

        if (!message.trim()) {
            displayError(messageEL);

            return;
        }

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Your Message did not go through");
                }
                return res.json();
            })
            .then((json) => {
                result.html("Your message has been sent");
            })
            .then(() => {
                form.trigger("reset");
                setTimeout(() => {
                    result.html("");
                }, 2500);
            })
            .catch((err) => {
                result.html("Your message did not go through");
            });
    });
});
