class InputFilter {
    static events = ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"]
    static setInputFilter(input, inputFilter) {
        InputFilter.events.forEach(function(event) {
            input.addEventListener(event, function() {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = "";
                }
            });
        });
    }
}

export default InputFilter;