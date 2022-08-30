import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import axios from 'axios'
import Loader from '../components/Loader'

const Home = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false)
            setIsLoading(true)

            try {
                const results = await axios("https://api.giphy.com/v1/gifs/search?api_key=UpkryBHVAyDXR6ih96GJoPQ47sfRv8Kf&q=present&limit=1&offset=0&rating=g&lang=en")

                setData(results.data.data[0].images.fixed_height.url)
            } catch (err) {
                setIsError(true)
                console.log(err)
                setTimeout(() => setIsError(false), 4000)
            }

            setIsLoading(false)
        }

        fetchData()
    }, [])

    const renderGif = () => {
        if (isLoading) {
            return <Loader/>
        }
        return <img src={data}/>
    }

    return (
        <div className="home container">
            <div className="home-body">
                <div>Images from <img src='https://upload.wikimedia.org/wikipedia/commons/8/82/Giphy-logo.svg' width='80vw' alt='' /></div>
                <h1>Givin Giphs</h1>
                <div className="navbar">
                    <Link className='nav-link' to='/search'>Search GIFs</Link>
                    <Link className='nav-link' to='/about'>About</Link>
                </div>
            </div>
            <div className="home-float">
                {renderGif()}
            </div>
        </div>
    )
}

export default Home