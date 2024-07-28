import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import TestRenderer from 'react-test-renderer';
import AddCar from './components/AddCar';

// test('open add car modal form', async () => {
//   render(<App />);
//   // fireEvent.click(screen.getByText('NEW CAR'));
//   fireEvent.click(await screen.findByText('NEW CAR'));
//   expect(screen.getByRole('dialog')).toHaveTextContent('New car');
// });

// test('welcom', ()=>{
//   render(<App />);
//   fireEvent.click(screen.getByText("NEW CAR"));
//   expect(screen.getByRole('dialog')).toHaveTextContent("New car");
// });

test('renders a snapshot', ()=>{
  const tree = TestRenderer.create(<AddCar />).toJSON();
  expect(tree).toMatchSnapshot();
});