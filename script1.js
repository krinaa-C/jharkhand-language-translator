const inputText =
    document.getElementById("inputText");

const outputText =
    document.getElementById("outputText");

const micButton =
    document.getElementById("micButton");

const translateButton =
    document.getElementById("translateButton");

const speakButton =
    document.getElementById("speakButton");

const status =
    document.getElementById("status");


/* =========================
   MICROPHONE
========================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    const recognition =
        new SpeechRecognition();

    recognition.lang = "hi-IN";

    recognition.continuous = true;

    recognition.interimResults = true;


    micButton.addEventListener("click", () => {

        recognition.start();

        status.textContent =
            "🎤 Listening... Hindi mein boliye.";

    });


    recognition.onresult = (event) => {

        let transcript = "";

        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            transcript +=
                event.results[i][0].transcript;

        }

        inputText.value = transcript;

    };


    recognition.onend = () => {

        status.textContent =
            "Microphone stopped.";

    };


    recognition.onerror = (event) => {

        status.textContent =
            "Microphone error: " +
            event.error;

    };

}
else {

    micButton.disabled = true;

    status.textContent =
        "Speech recognition is not supported in this browser.";

}


/* =========================
   TRANSLATE BUTTON
========================= */

translateButton.addEventListener(
    "click",
    () => {

        const text =
            inputText.value.trim();

        if (!text) {

            outputText.textContent =
                "Please enter Hindi text first.";

            return;

        }


        /*
         * Temporary demo translation.
         *
         * We will replace this with
         * Bhashini API later.
         */

        outputText.textContent =
            "AI translation will appear here.";

    }
);


/* =========================
   TEXT TO SPEECH
========================= */

speakButton.addEventListener(
    "click",
    () => {

        const text =
            outputText.textContent;

        if (!text ||
            text.includes("AI translation")) {

            return;

        }


        const speech =
            new SpeechSynthesisUtterance(text);

        speech.lang = "hi-IN";

        window.speechSynthesis.speak(
            speech
        );

    }
);