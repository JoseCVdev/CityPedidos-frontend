import { useEffect } from 'react';
import { useMatches } from 'react-router';

interface RouteHandle {
  title?: string;
}

export const DocumentTitle = () => {
  const matches = useMatches();

  useEffect(() => {
    const matchWithTitle = [...matches]
      .reverse()
      .find(
        (
          match
        ): match is typeof match & { handle: RouteHandle } =>
          typeof (match.handle as RouteHandle | undefined)?.title === 'string'
      );

    if (matchWithTitle?.handle?.title) {
      document.title = matchWithTitle.handle.title;
    }
  }, [matches]);

  return null;
};
