const content = `
    var wrapper = document.getElementById("signature-pad"),
        clearButton = wrapper.querySelector("[data-action=clear]"),
        saveButton = wrapper.querySelector("[data-action=save]"),
        canvas = wrapper.querySelector("canvas"),
        signaturePad;
    
    // Adjust canvas coordinate space taking into account pixel ratio,
    // to make it look crisp on mobile devices.
    // This also causes canvas to be cleared.
    function resizeCanvas() {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
    }
    
    async function clearScreen() {
        await signaturePad.clear();
        window.ReactNativeWebView.postMessage(JSON.stringify({
            event: "clear",
            data: null
        }));
    }

    async function saveScreen() {
        let data = null;
        if (!signaturePad.isEmpty()) {
            data = await signaturePad.toDataURL()
        }
        window.ReactNativeWebView.postMessage(JSON.stringify({
            event: "save",
            data
        }));
    }

    window.onresize = resizeCanvas;
    resizeCanvas();
    
    signaturePad = new SignaturePad(canvas);
`;

export default content;
