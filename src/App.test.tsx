// import { render, screen } from '@testing-library/react';
import MainApp from './App';
import ReactDOM from 'react-dom'
// import App from './App';

// test('renders learn react link', () => {
//   render(<MainApp />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MainApp />, div)
  ReactDOM.unmountComponentAtNode(div)
})