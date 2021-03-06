function getText(){
    return document.body.innerText
}

function logSadness()
{
    var quant;
    chrome.storage.local.get('sadNum', function(item) {
        quant = item.sadNum;
        if (quant == null)
        {
            quant = 1;
            chrome.storage.local.set({'sadNum': quant});
        }
        else if (quant == 11)
        {
            quant = 1;
            chrome.storage.local.set({'sadNum': quant})
        }
        else
        {
            quant++;
            chrome.storage.local.set({'sadNum': quant});
        }
        console.log("Quant is " + quant - 1)
    });
}

function makeYouHappy()
{
    chrome.storage.local.get('sadNum', function(item) {
    if (item.sadNum >= 8)
    {
        modal5.open();
    }
    else 
    {
        modal.open();
    }
});
}

//tingle modal
// instantiate new modal
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        return true; // close the modal

    }
});

// set content
var nameToOutput = "";
chrome.storage.local.get('submitted', function(item) {
        if (item.submitted != null)
        {
            nameToOutput = item.submitted.toString();
        }
    });
modal.setContent('<h1>hey! we noticed you might be feeling a bit stressed out.</h1>');
//modal.setContent(nameToOutput);
//document.getElementById('dispName').innerHTML = nameToOutput;

// add a button
modal.addFooterBtn('yeah, a bit', 'tingle-btn tingle-btn--primary', function() {
    // here goes some logic
    modal.close();
    modal2.open();
});

// add another button
modal.addFooterBtn("nah it's chill, just reading some heavy content", 'tingle-btn tingle-btn--danger', function(){
    // here goes some logic
    modal.close();
    chrome.storage.local.get('sadNum', function(item) {
    if (item.sadNum >= 6)
    {
        modal5.open();
    }
    })
});
// mood options
var modal2 = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        return false; // nothing happens
    }
});

modal2.setContent('<h1> let\'s make a playlist to help you out. how are you feeling right now? </h1>');

// add a button
modal2.addFooterBtn('sad', 'tingle-btn tingle-btn--primary', function() {
    // here goes some logic
    modal2.close();
    modal3.open();
});

// add another button
modal2.addFooterBtn('anxious', 'tingle-btn tingle-btn--default', function() {
    // here goes some logic
    modal2.close();
    openInNewTab('https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:' + choosePlaylist('anxiousFear')[0]);
});

// add a button
modal2.addFooterBtn('angry', 'tingle-btn tingle-btn--primary', function() {
    // here goes some logic
    modal2.close();
    modal4.open();
});


// add another button
modal2.addFooterBtn('maybe later', 'tingle-btn tingle-btn--default', function() {
    // here goes some logic
    modal2.close();
    //express concern bc have visited lots of sad pages
    var quant;
    chrome.storage.local.get('sadNum', function(item) {
        if (item.sadNum > 5)
        {
            modal5.open();
        }
    });
});

// further options for sad
var modal3 = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2', 'custom-class-3'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        return false; // nothing happens
    }
});

modal3.setContent('<h1>what would you like to do?</h1>');
// add a button
modal3.addFooterBtn('cheer up!', 'tingle-btn tingle-btn--primary', function() {
    // here goes some logic
    openInNewTab('https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:' + choosePlaylist('happy')[0]);
    modal3.close();
});

// add another button
modal3.addFooterBtn('feel it out', 'tingle-btn tingle-btn--default', function() {
    // here goes some logic
    openInNewTab('https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:' + choosePlaylist('sad')[0]);
    modal3.close();
});

// futher options for angry
var modal4 = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
    }
});

modal4.setContent('<h1>what would you like to do?</h1>');
// add a button
modal4.addFooterBtn('calm down', 'tingle-btn tingle-btn--primary', function() {
    // here goes some logic
    openInNewTab('https://open.spotify.com/embed/user/spotify/playlist/' + choosePlaylist('anxiousFear')[0]);
    modal4.close();
});

// add another button
modal4.addFooterBtn('let it out', 'tingle-btn tingle-btn--default', function() {
    // here goes some logic
    openInNewTab('https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:' + choosePlaylist('angry')[0]);
    modal4.close();
});


// if visited several sad pages
var modal5 = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
    }
});

modal5.setContent('<h1>you\'ve been looking at quite a lot of heavy content and we\'re getting worried. please reach out to a doctor or family members if you\'re struggling.</h1>');

// add a button
modal5.addFooterBtn('Consult psychiatrist', 'tingle-btn tingle-btn--primary', function() {
    // here goes some logic
    callHotline();
    modal5.close();

});

modal5.addFooterBtn('Call a family member', 'tingle-btn tingle-btn--primary', function() {
    // here goes some logic
    modal5.close();
});

modal5.addFooterBtn('Call a friend', 'tingle-btn tingle-btn--primary', function() {
    // here goes some logic
    modal5.close();
});

function callHotline()
{
    $(function() {
        
        const accountSid = 'ACecd9aef22723409ac24163eba5b4b67a';
        const authToken = '5bf93c0505712f08f085ea2e14606792';

        var body = {
    'Url': 'https://handler.twilio.com/twiml/EH49f3c8b695ed4c888a72d8d799e5bd84',
    'To': '+918884559384',
    'From': '+18506080212'
        };
        var encoded = btoa(`${accountSid}:${authToken}`);

		console.log("Just called hotline number");
        $.ajax({
            url: `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`,
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xhrObj.setRequestHeader("Authorization",`Basic ${encoded}`);
            },
            type: "POST",
            // Request body
            data: body,
        })
        .done(function(data){
            console.log(data);
        })
        .fail(function(data){
			console.log(data);
        });
     });   
}

function sentimentAnalysis()
{
	$(function() {
        var params = {
            // Request parameters
        };

        var docs = {'id' : '1', 'language': 'en', 'text' : getText()};

        //content size should be min between size and 5100
        var end = getText().toString().length;

        if (end > 5000)
        {
            end = 5000;
        }

        var words = getText().toString().substring(0, end);

        let blahblah = { 'documents': [
    { 'id': '1', 'language': 'en', 'text': words}]};

        let body = JSON.stringify(blahblah);

        //let body = JSON.stringify(documents);
      
        $.ajax({
            url: "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","73d51cf24e4d4619b4ffa57bd4f0765b ");
            },
            type: "POST",
            // Request body
            data: body,
        })
        .done(function(data) {
            console.log("Score is " + data.documents[0].score);
            if (data.documents[0].score < 0.2)
            {
                makeYouHappy();
                logSadness();
            }
            //else you are already reading happy stuff and don't need to be reminded to be happy!
        })
        .fail(function() {
            console.log("error");
        });
    });
}

if(true){
    console.log("start sentiment analysis");
    sentimentAnalysis();
}

function openInNewTab(url) {
  var win = window.open(url, '_blank', 'width=300,height=300,frameborder=0,allowtransparency=true,allow=encrypted-media');
  win.focus();
}

//all the playlist IDs and titles
var anxiousFearPlaylists = ['37i9dQZF1DX4sWSpwq3LiO', '37i9dQZF1DX3Ogo9pFvBkY', '37i9dQZF1DXcCnTAt8CfNe', 
'37i9dQZF1DWU0ScTcjJBdj', '37i9dQZF1DX3PIPIT6lEg5', '37i9dQZF1DX1s9knjP51Oa', '37i9dQZF1DXa9xHlDa5fc6', 
'37i9dQZF1DWTkxQvqMy4WW', '37i9dQZF1DX8ymr6UES7vc', '37i9dQZF1DWZqd5JICZI0u'];

var happyPlaylists = ['37i9dQZF1DX3rxVfibe1L0', '37i9dQZF1DX7KNKjOK0o75', '37i9dQZF1DWYBO1MoTDhZI', 
'37i9dQZF1DXdPec7aLTmlC', '37i9dQZF1DWSkMjlBZAZ07', '37i9dQZF1DX9XIFQuFvzM4', '37i9dQZF1DX2sUQwD7tbmL', 
'37i9dQZF1DX0UrRvztWcAU', '37i9dQZF1DXaK0O81Xtkis', '37i9dQZF1DWSf2RDTDayIx'];

var sadPlaylists = ['37i9dQZF1DX3YSRoSdA634', '37i9dQZF1DWSqBruwoIXkA', '37i9dQZF1DWVV27DiNWxkR'];

var angryPlaylists = ['37i9dQZF1DWU6kYEHaDaGA', '37i9dQZF1DWWJOmJ7nRx0C', '5s7Sp5OZsw981I2OkQmyrz', 
'37i9dQZF1DWTcqUzwhNmKv', '37i9dQZF1DWXIcbzpLauPS'];

var anxiousFearPlaylistsTitles = ['Peaceful Piano', 'Ambient Chill', 'Musical Therapy', 'Relax & Unwind', 
'Microtherapy', 'Calm Vibes', 'License to Chill', 'Chillin on a Dirt Road', 'Rain Sounds', 'Peaceful Meditation'];

var happyPlaylistsTitles = ['Mood Booster', 'Have a Great Day!', 'Good Vibes', 'Happy Hits', 'Happy Folk', 'Feelin Good', 
'Feel-Good Indie Rock', 'Wake Up Happy', 'Happy Chill Good Time Vibes', 'Happy Beats'];

var sadPlaylistsTitles = ['Life Sucks', 'Down in the Dumps', 'Melancholia'];

var angryPlaylistsTitles = ['Unleash the Fury', 'Rock Hard', 'Rage Quit', 'Kickass Metal', 'Metalcore'];

function choosePlaylist(mood) {
    var playlist;
    var title;
    if (mood == 'anxiousFear'){
        var index = Math.floor(Math.random() * anxiousFearPlaylists.length);
        playlist = anxiousFearPlaylists[index];
        title = anxiousFearPlaylistsTitles[index];
    }
    else if (mood == 'happy'){
        var index = Math.floor(Math.random() * happyPlaylists.length);
        playlist = happyPlaylists[index];
        title = happyPlaylistsTitles[index];
    }
    else if (mood == 'sad'){
        var index = Math.floor(Math.random() * sadPlaylists.length);
        playlist = sadPlaylists[index];
        title = sadPlaylistsTitles[index];
    }
    else if (mood == 'angry'){
        var index = Math.floor(Math.random() * angryPlaylists.length);
        playlist = angryPlaylists[index];
        title = angryPlaylistsTitles[index];
    }
    return [playlist, title];
}
