import React from 'react'
import { Link } from 'react-router-dom';


const HomepageContent = () => {
    return (
        <div className='homepageContent'>
            <p>Bir el versen! Bir el ver, sen!</p>
            <p>Her şey olmasa da, bir şey daha güzel olacak.</p>
            <p>Türkiye’deki tüm SMA’lı çocuklarımız bir arada.</p>
            <p>Tüm çocuklarımıza daha kolay ulaşın diye.</p>
            <Link className="headerItem"
                to={`/about`}>
                <p>Daha fazla bilgi için buraya bakabilirsiniz.</p>
            </Link>

        </div>
    )
}

export default HomepageContent
