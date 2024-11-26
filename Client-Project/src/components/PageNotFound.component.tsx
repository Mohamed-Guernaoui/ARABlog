import React from 'react'
import { pageNotFoundImg,logo } from '../assets'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <section className='h-cover relative flex flex-col justify-center items-center gap-20 text-center'>
      <img src={pageNotFoundImg} alt={'404'} className='select-none border-2 border-grey w-72 aspect-square object-cover rounded'/>
      <h1 className='text-4xl leading-7 font-gelasio'>Page Not Found</h1>
      <p className='text-dark-grey text-xl leading-7 -mt-8'>The page you are looking does not exists
          Head back to the<Link to={'/'} className='text-black underline'>homepage</Link>
      </p>
      <div className='mt-auto'>
                    <img src={logo} alt="logo"  className='h-8 object-contain block mx-auto select-none'/>
                    <p className='mt-5 text-dark-grey'>Read millions of stories around the world</p>
      </div>
    </section>
  )
}

export default PageNotFound