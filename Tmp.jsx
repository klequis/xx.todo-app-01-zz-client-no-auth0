import React, { useState } from 'react';
import { render } from 'react-dom';
import { useFetch as useFetchStep1 } from './step1';
import { useFetch as useFetchStep2 } from './step2';
import { useFetch as useFetchStep3 } from './step3';
import { useFetch as useFetchStep4 } from './step4';

const url = 'https://hn.algolia.com/api/v1/search?query=react';

const ShowData = ({ data }) => (
  <ul>
    {data.hits.map(item => (
      <li key={item.objectID}>
        <a href={item.url}>{item.title}</a>
      </li>
    ))}
  </ul>
);

const Step1 = () => {
  const data = useFetchStep1(url);
  if (!data) return null;
  return <ShowData data={data} />;
};

const Step2 = () => {
  const data = useFetchStep2(url);
  if (!data) return null;
  return <ShowData data={data} />;
};

const Step3 = () => {
  const data = useFetchStep3(url);
  if (!data) return null;
  return <ShowData data={data} />;
};

const Step4 = () => {
  const { pending, result } = useFetchStep4(url);
  if (pending) return <div>Loading...</div>;
  if (!result) return null;
  return <ShowData data={result} />;
};

const App = () => {
  const [step, setStep] = useState('step1');
  return (
    <div>
      <select value={step} onChange={e => setStep(e.target.value)}>
        <option value={'step1'}>Step1</option>
        <option value={'step2'}>Step2</option>
        <option value={'step3'}>Step3</option>
        <option value={'step4'}>Step4</option>
      </select>
      <hr />
      {
        step === 'step1' ? <Step1 /> :
          step === 'step2' ? <Step2 /> :
            step === 'step3' ? <Step3 /> :
              step === 'step4' ? <Step4 /> :
        /* default */ null
      }
    </div>
  );
};

render(<App />, document.getElementById('root'));
