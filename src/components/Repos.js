import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
// STEP 2 - Chart Data

const Repos = () => {
  const {repos} = React.useContext(GithubContext);
  let languages = repos.reduce((total, item) => {
    const {language, stargazers_count } = item
    if(!language) return total;
    if(!total[language]) {
      total[language] = {label: language, value: 1, star : stargazers_count}
    } else {
      // total[language].value += 1
      // total[language].star += 
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        star: total[language].star + stargazers_count,
      }
    }
    return total
  }, {})
  const mostUsed = Object.values(languages).sort((a,b) => b.value - a.value).slice(0, 5)
  const mostPopular = Object.values(languages).sort((a,b) => b.star - a.star).slice(0, 5).map((item) => {
    return  {...item, value: item.star}
  } )
  console.log(languages);
  const chartData = [
    {
      label: "Venezuela",
      value: "290"
    },
    {
      label: "Saudi",
      value: "260"
    },
    {
      label: "Canada",
      value: "180"
    }
    
  ];
  return (
    <div className="section">
      <Wrapper className='section-center'>
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={mostUsed} />
        <Doughnut2D data={mostPopular} />
      </Wrapper>

    </div>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
