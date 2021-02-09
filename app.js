
const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;
    const ApiUrl = `https://api.lyrics.ovh/suggest/${searchText}`;
    if (searchText == false) {
        alert('Enter a song name.. :)')
    }
    else{
        try {
            const res = await fetch(ApiUrl);
            const data = await res.json();
            displaySongs(data.data);
        }
        catch (error) {
            const songContainer = document.getElementById('song-container');
            songContainer.innerHTML = '<h1 style= "text-align: center; color: red">Song not found...!</h1>';
        }
    }
}

document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById('search-btn').click();
    }
});

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';

    if (songs == false) {
        songContainer.innerHTML = '<h1 style= "text-align: center; color: red">Song not found...!</h1>';
    }
    else {
        songs.forEach(song => {
            const songDiv = document.createElement('div');
            songDiv.className = 'single-result row align-items-center my-3 p-3';
            songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick= "getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
            `
            songContainer.appendChild(songDiv);
        });
    }
    document.getElementById('lyrics-container').style.display = 'none';
}


const getLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
        .catch(() => {
            const lyricsContainer = document.getElementById('lyrics-container');
            lyricsContainer.innerText = 'Sorry our lyrics is not ready... :(';
        })
}

const displayLyrics = lyrics => {
    const lyricsContainer = document.getElementById('lyrics-container');
    lyricsContainer.innerText = '';
    if (lyrics == false) {
        lyricsContainer.innerText = 'Sorry our lyrics is not ready... :(';
    }
    else{
        lyricsContainer.innerText = lyrics;
    }
    document.getElementById('lyrics-container').style.display = 'block';

}