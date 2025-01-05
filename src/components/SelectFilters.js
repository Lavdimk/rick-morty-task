import React from 'react';
import { useTranslation } from 'react-i18next';

const SelectFilters = ({ status, setStatus, species, setSpecies, sortBy, setSortBy }) => {
  const { t } = useTranslation();

  return (
    <div className="select-container">
      <select onChange={(e) => setStatus(e.target.value)} value={status}>
        <option value="">{t('allStatuses')}</option>
        <option value="Alive">{t('alive')}</option>
        <option value="Dead">{t('dead')}</option>
        <option value="unknown">{t('unknown')}</option>
      </select>

      <select onChange={(e) => setSpecies(e.target.value)} value={species}>
        <option value="">{t('allSpecies')}</option>
        <option value="Human">{t('human')}</option>
        <option value="Alien">{t('alien')}</option>
      </select>

      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <option value="name">{t('sortByName')}</option>
        <option value="origin">{t('sortByOrigin')}</option>
      </select>
    </div>
  );
};

export default SelectFilters;
