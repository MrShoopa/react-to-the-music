import React from 'react';

class Song extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    };


    render = () => {
        return (
            <p>{this.props.song.name} - <i>{this.props.song.artist}</i></p>
        )
    }
}

Song.defaultProps = {
    song: {
        id: "0",
        name: "Angel Voices",
        artist: "VIRTUAL SELF",
        album: "",
        year: 2018,
        artwork: "https://m.media-amazon.com/images/I/71VJ6MxpN8L._SS500_.jpg",
        duration: 392,
        source: "https://docs.google.com/uc?id=1TD5rZhiKZzC7-uwDCaB9EABeZkGEFQkQ&export=download"
    }
};

export default Song