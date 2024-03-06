$(function () {
    const menuBtn = $(`#toggle-btn`);
    const menu = $(`#nav-menu`);

    menuBtn.on("click", (e) => {
        console.log("clicked");
        const currentBtnAttr = menuBtn.attr("data-menu-shown");
        const currentMenuAttr = menu.attr("data-shown");
        if (currentBtnAttr === "true" && currentMenuAttr === "true") {
            menuBtn.attr("data-menu-shown", "false");
            menu.attr("data-shown", false);
        } else {
            menuBtn.attr("data-menu-shown", "true");
            menu.attr("data-shown", true);
        }
    });
});
