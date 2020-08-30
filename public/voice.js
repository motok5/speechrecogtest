var flag_speech = false;
var recording = false;
var btn = document.getElementById('btn');

btn.addEventListener( 'click' , function() {
    if (!recording) {
        // 音声認識をスタート        
        this.innerHTML = "音声認識を停止";
        recording = true;
        vr_function();
    } else {
        // 音声認識を停止
        vr_stop_function(null);
    }
} );


function vr_function() {
    var content = document.getElementById('content');

    var speech = new webkitSpeechRecognition();
    
    //言語を日本語に設定
    speech.lang = "ja";
    speech.continuous = true;
    speech.interimResults = true;

    speech.onsoundstart = function(){
        document.getElementById('status').innerHTML = "認識中";
    };
    speech.onnomatch = function(){
        document.getElementById('status').innerHTML = "もう一度試してください";
    };
    speech.onerror= function(){
        document.getElementById('status').innerHTML = "エラー";
        if((!flag_speech) && recording) {
            vr_function();
        } else {
            vr_stop_function(speech);
        }
    };
    speech.onsoundend = function(){
        if (recording) {
            document.getElementById('status').innerHTML = "スタンバイ";
            this.innerHTML = "音声認識を開始";
            vr_function();
        } else {
            vr_stop_function(speech);
        }
    };

    speech.addEventListener( 'result' , function( e ) {
        console.log( e );
        if (!recording) {
            vr_stop_function(speech);
        } else {
            if (e.results.length > 0) {
                for (var i = e.resultIndex; i < e.results.length; i++){
                    if(e.results[i].isFinal) {
                        var listItem = document.createElement("div");
                        listItem.textContent = e.results[i][0].transcript;
                        content.appendChild(listItem);
                        if (recording) {
                            vr_function();
                        } else {
                            vr_stop_function(speech);
                        }
                    } else {
                        flag_speech = true;
                        if (!recording) {
                            vr_stop_function(speech);
                        }
                    }
                }
            }
        }
    } );
    flag_speech = false;
    document.getElementById('status').innerHTML = "スタンバイ";
    if (recording) {
        speech.start();
    } else {
        vr_stop_function(speech);
    }
};

function vr_stop_function(speech) {
    btn.innerHTML = "音声認識を開始";
    document.getElementById('status').innerHTML = "停止中";
    recording = false;
    flag_speech = false;
    if (speech) {
        speech.stop();
    }
};
