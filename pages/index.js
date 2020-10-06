import { random, TinyColor } from '@ctrl/tinycolor'
import { filter, map, shuffle, slice, uniq } from 'lodash'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

// Define Primary Function of Page
export default function Home() {
  // set all react state to be default value
  const [colors, setColors] = useState([])
  const [colorsFiltered, setColorsFiltered] = useState([])
  const [saturationFiltered, setSaturationFiltered] = useState([])
  const [filterVal, setFilterVal] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  // Define Function for Getting Random Color
  const getRandomColor = () => {
    return random().toHexString()
  }

  // Define Function for Getting Small Random Number (2 to 5)
  const getRandomNumber = () => {
    return Math.floor((Math.random() * (5 + 1)) + 2)
  }

  // Define Function for Getting Big Random Number (9999 to 999999)
  const getRandomNumbers = () => {
    return Math.floor((Math.random() * (999999 + 1)) + 9999)
  }

  // Define Function for Generate Color and Reset Filter Color & Dakrness
  const generateColors = () => {
    const _colors = []
    for (let x = 1; x <= 40; x++) {
      const randomColor = getRandomColor()
      for (let y = 1; y <= getRandomNumber(); y++) {
        _colors.push(randomColor)
      }
    }

    // Set all state to default value 
    setFilterVal('All')
    setIsChecked(false)
    setSaturationFiltered(shuffle(slice(_colors, 0, 40)))
    setColorsFiltered(shuffle(slice(_colors, 0, 40)))
    setColors(shuffle(slice(_colors, 0, 40)))
  }

  // Execute function in first load page
  useEffect(() => {
    generateColors()
  }, [])

  // Define JSX Component for Color Box Gallery
  const ColorsComp = () => (<>
    {map(saturationFiltered, (item) => {
      return (<div key={getRandomNumbers().toString() + item} style={{ width: '150px', height: '150px', margin: '10px', backgroundColor: item, border: '10px solid #cacaca' }}></div>)
    })}
  </>)

  // Define JSX Component for Color Filter Select 
  const FilterColor = () => (
    <div key="divSelectFilter" style={{ display: 'block' }}>
      Category : <select key="selectFilter" value={filterVal} onChange={handleChangeColorFilter} style={{ width: '150px', backgroundColor: (filterVal !== 'All') ? filterVal : '#FFFFFF' }}>
        <option key={`AllFilterOption`} style={{ backgroundColor: '#FFFFFF', color: '#333333' }} value="All">All</option>
        {map(uniq(colors), (item) => {
          return (
            <option style={{ backgroundColor: item, color: item }} key={'option' + getRandomNumbers().toString() + item} value={item}>
              &nbsp;
            </option>
          )
        })}
      </select>
    </div>
  )

  // Define JSX Component for Saturation Filter Checkbox, show dark color when checked
  const FilterSaturation = () => (
    <div style={{ display: 'block' }}>
      Saturation (Darker) : <input type="checkbox" checked={isChecked} onChange={handleChangeCheckbox} />
    </div>
  )

  // Define Function for Handle Change Select Option Color
  const handleChangeColorFilter = (e) => {
    // define var colorSelected from selected value
    const colorSelected = e.target.value
    setFilterVal(colorSelected)
    if (colorSelected === 'All') {
      // Set Filter state to Show All Color
      setColorsFiltered(colors)
      setSaturationFiltered(colors)
      setIsChecked(false)
    } else {
      // Set Filter state to selected value
      setColorsFiltered(filter(colors, o => o === colorSelected))
      setSaturationFiltered(filter(colors, o => o === colorSelected))
      setIsChecked(false)
    }
  }

  // Define Function for Handle Change Checkbox Saturation (Darker Color) filter
  const handleChangeCheckbox = () => {
    if (!isChecked) {
      setSaturationFiltered(filter(colorsFiltered, o => new TinyColor(o).isDark() && o))
    } else {
      setSaturationFiltered(colorsFiltered)
    }
    setIsChecked(!isChecked)
  }

  return (
    <div className="container">
      <Head>
        <title>App - Dewa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Dewa Danu Brata Colours Gallery
        </h1>

        <br /><br />
        <button onClick={() => generateColors()}>Reset Random Color</button>
        <br />

        <FilterColor />
        <FilterSaturation />

        <div className="grid">
          <ColorsComp />
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 1000px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
