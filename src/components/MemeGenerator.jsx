import {useState, useEffect} from 'react'


export default function MemeGenerator () {
    const [meme, setMeme] =  useState({
        topText: '',
        bottomText: '',
        allMemes: [],
        randomImg: ''
    }) 
    console.log(meme.randomImg)

    const [allMemes, setAllMemes] = useState([])
  
    useEffect(() => {
      fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(memes => setAllMemes(memes.data.memes))
    }, []) // Add an empty dependency array
  
    // Method to submit from and create meme
    function getMemes() {
      const randomNum = Math.floor(Math.random() * allMemes.length)
      const url = allMemes[randomNum].url
      setMeme(prevMeme => ({
        ...prevMeme,
        randomImg: url
      }))
    }

    function handleChange(e) {
      const { name, value } = e.target
      setMeme(prevMeme => ({
        ...prevMeme,
        [name]: value
      }))
    }

    function handleSubmit(e) {
      e.preventDefault()
      console.log(getMemes())
    }


    return (
        <div>
          {/* // Controlled form */}
          <form className='meme-form' onSubmit={handleSubmit}>
            <label className='meme-input'>Top Text
              <input
                placeholder='Enter Text'
                type='text'
                value={meme.topText}
                name='topText'
                onChange={handleChange}
              />
            </label>
            <label className="meme-input">Bottom Text
              <input
                placeholder='Enter Text'
                type='text'
                value={meme.bottomText}
                name='bottomText'
                onChange={handleChange}
              />
            </label>
            <button className='btn' onClick={getMemes}>Generate</button>
          </form>
          <br />
          <div className='meme'>
            {meme.randomImg === '' ? (
              ''
            ) : (
              <img src={meme.randomImg} alt='meme' />
            )}
            {meme.randomImg === '' ? (
              ''
            ) : (
              <h2 className='top'>{meme.topText}</h2>
            )}
            {meme.randomImg === '' ? (
              ''
            ) : (
              <h2 className='bottom'>{meme.bottomText}</h2>
            )}
          </div>
        </div>
      )
    }

