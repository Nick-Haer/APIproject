
let buttonDisplay = $("#buttonsgohere")
let gifsDisplay = $("#gifsgohere")

let submitted = $("#submitbutton")
let inputBox = $("#inputter")


let nature = ["tree", "mountain", "fish", "stream", "hill", "path", "forest", "volcano", "lake", "river"];

function makeButtons() {

        buttonDisplay.empty()

    for (let element of nature) {
       let madeButton =  $(`<button class = "clickit" data-name = "${element}">${element}</button>`)
       madeButton.prependTo(buttonDisplay)
    }
}


function summonGifs () {

    gifsDisplay.empty()

    let queried = $(this).attr("data-name")

    console.log(queried);

    let queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=oKCHtfIbY0Dr7JB925gVyaUoyUIT0PzE&q=${queried}&limit=10&offset=0&rating=G&lang=en`


    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        for (i=0; i <nature.length; i++) {
            console.log(response)
            let stillSrc = response.data[i].images.fixed_width_still.url
            let movSrc = response.data[i].images.fixed_width.url

            let nextGif = $(`<img>`)
            nextGif.attr("data-still", stillSrc)
            nextGif.attr("data-move", movSrc)
            nextGif.attr("src", stillSrc)
            
            let nextP = $("<p>")
            nextP.text(response.data[i].rating)

            nextGif.appendTo(gifsDisplay)
            nextP.appendTo(gifsDisplay)
        }
    })
}


submitted.on("click", function () {
    event.preventDefault()
    let name = inputBox.val()
    nature.push(name);
    makeButtons()
})



$(document).on("click", ".clickit", summonGifs)

$(document).on("click", "img", function () {
    if ($(this).attr("data-move") === $(this).attr("src")) {
        let insert = $(this).attr("data-still")
        $(this).attr("src", insert)
    } else {
        let insert = $(this).attr("data-move")
        $(this).attr("src", insert)
    }
})





makeButtons()