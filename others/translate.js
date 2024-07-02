function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');

    var $googleDiv = $("#google_translate_element .skiptranslate");
    var $googleDivChild = $("#google_translate_element .skiptranslate div");
    $googleDivChild.next().remove();

    $googleDiv.contents().filter(function () {
        return this.nodeType === 3 && $.trim(this.nodeValue) !== "";
    }).remove();
}

function openDialog() {
    document.getElementById("dialog").showModal();
}

function closeDialog() {
    document.getElementById("dialog").close();
}
