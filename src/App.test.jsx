import { describe, it, expect, vi } from 'vitest';
import App, {
    storiesReducer,
    Item,
    List,
    SearchForm,
    InputWithLabel,
  } from './App';
  import {
    render,
    screen,
    fireEvent,
    waitFor,
  } from '@testing-library/react';

const storyOne = {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
};

const storyTwo = {
    title: 'Redux',
  url: 'https://redux.js.org/',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
};

const stories = [storyOne, storyTwo];

describe('SearchForm', () => {
  const searchFormProps = {
    searchTerm: 'React',
    onSearchInput: vi.fn(),
    onSearchSubmit: vi.fn(),
  };

  it('renders the input field with its value', () => {
    render(<SearchForm {...searchFormProps} />);

    screen.debug();
    expect(screen.getByDisplayValue('React')).toBeInTheDocument();
  });

  it('renders the correct label', () => {
    render(<SearchForm {...searchFormProps} />);

    expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
  });

  it('calls onSearchInput on input field change', () => {
    render(<SearchForm {...searchFormProps} />);
    fireEvent.change(screen.getByDisplayValue('React'), {
      target: { value: 'Redux' },
    });
    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
  });

  it('calls onSearchSubmit on button submit click', () => {
    render(<SearchForm {...searchFormProps} />);
    fireEvent.submit(screen.getByRole('button'));
    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
  });
});

describe('storiesReducer', () => {
  it('removes a story from all stories', () => {
    const action = { type: 'REMOVE_STORY', payload: storyOne };
    const state = { data: stories, isLoading: false, isError: false };
    const newState = storiesReducer(state, action);
    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });
});

describe('Item', () => {
    it('renders all properties', () => {
      const handleRemoveItem = vi.fn();

      render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);
      //screen.debug();
      expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
      expect(screen.getByText('React')).toHaveAttribute(
        'href',
        'https://reactjs.org/'
      );
       expect(screen.getByRole('button')).toBeInTheDocument();
       fireEvent.click(screen.getByRole('button'));
       expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    });
  });

describe('something truthy and falsy', () => {
    it('true to be true', () => {
      expect(true).toBeTruthy();
    });

    it('false to be false', () => {
      expect(false).toBeFalsy();
    });
  });

describe('App component', () => {
    it('removes an item when clicking the Dismiss button', () => {

    });

    it('requests some initial stories from an API', () => {

    });
});
