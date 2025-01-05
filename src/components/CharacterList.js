import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import SelectFilters from './SelectFilters'; 
import { ClipLoader } from 'react-spinners';



const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $status: String, $species: String) {
    characters(page: $page, filter: { status: $status, species: $species }) {
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
      }
    }
  }
`;

const CharacterList = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page, status, species },
  });

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={50} color={"#3b99d6"} loading={loading} />
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error) return <p>{t('error')}: {error.message}</p>;

  const sortedCharacters = [...data.characters.results].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'origin') {
      return a.origin.name.localeCompare(b.origin.name);
    }
    return 0;
  });

  const goToPreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const goToNextPage = () => setPage(page + 1);

  return (
    <div>
      <h1>{t('title')}</h1>
      <SelectFilters 
        status={status} 
        setStatus={setStatus} 
        species={species} 
        setSpecies={setSpecies} 
        sortBy={sortBy} 
        setSortBy={setSortBy}
      />
      <ul>
        {sortedCharacters.map((character) => (
          <li key={character.id}>
            <h3>{character.name}</h3>
            <p>{t('status')}: {character.status}</p>
            <p>{t('species')}: {character.species}</p>
            <p>{t('gender')}: {character.gender}</p>
            <p>{t('origin')}: {character.origin.name}</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={goToPreviousPage} disabled={page === 1}>
          {t('previousPage')}
        </button>
        <button onClick={goToNextPage}>
          {t('nextPage')}
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
