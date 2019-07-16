
let buttonDisplay = $("#buttonsgohere")
let gifsDisplay = $("#gifsgohere")


let nature = ["tree", "mountain", "fish", "stream", "hill", "path", "forest", "volcano", "lake", "river"];

function makeButtons() {
    for (let element of nature) {
       let madeButton =  $(`<button class = "clickit" data-name = "${element}">${element}</button>`)
       madeButton.prependTo(buttonDisplay)
    }
}


function summonGifs () {

    gifsDisplay.empty()

    let queried = $(this).attr("data-name")

    let queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=oKCHtfIbY0Dr7JB925gVyaUoyUIT0PzE&q=${queried}&limit=10&offset=0&rating=G&lang=en`


    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        for (i=0; i <nature.length; i++) {
            console.log(response)
            let nextSrc = response.data[i].images.fixed_width.url
            let nextGif = $(`<img>`)
            nextGif.attr("src", nextSrc)
            let nextP = $("<p>")
            nextP.text(response.data[i].rating)
            nextP.appendTo(gifsDisplay)
            nextGif.appendTo(gifsDisplay)
        }
    })
}



$(document).on("click", ".clickit", summonGifs)





makeButtons()