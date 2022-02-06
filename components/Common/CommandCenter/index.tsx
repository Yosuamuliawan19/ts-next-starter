import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  KBarSearch,
  useMatches,
} from 'kbar';
import React from 'react';

export const COMMAND_LIST = [
  {
    id: 'home',
    name: 'Home',
    shortcut: ['h'],
    keywords: 'writing words',
    perform: () => (window.location.pathname = '/'),
  },
  {
    id: 'blog',
    name: 'Blog',
    shortcut: ['b'],
    keywords: 'writing words',
    perform: () => (window.location.pathname = 'blog'),
  },
  {
    id: 'contact',
    name: 'Contact',
    shortcut: ['c'],
    keywords: 'email',
    perform: () => (window.location.pathname = 'contact'),
  },
];
export default function CommandCenter() {
  const { results } = useMatches();

  return (
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator>
          <KBarSearch />
          <KBarResults
            items={results}
            onRender={({ item, active }) =>
              typeof item === 'string' ? (
                <div>{item}</div>
              ) : (
                <div
                  style={{
                    background: active ? '#eee' : 'transparent',
                  }}
                >
                  {item.name}
                </div>
              )
            }
          />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}
