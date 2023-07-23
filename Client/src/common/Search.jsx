import React from 'react'
import { Link } from 'react-router-dom'
import User from '../components/profile/User'

const Search = ({ CartItem }) => {
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })
  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <h3>VivaVenture</h3>
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Product name...' />
            <span>Search</span>
          </div>

          <div className='icon topSearch f_flex width'>

            <User />

            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search