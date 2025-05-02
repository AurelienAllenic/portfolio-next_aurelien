import React from 'react';

// Interface pour les props du composant
interface FiltersProps {
  setFilterSelected: (filter: string) => void;
  filterSelected: string[];
}

const Filters: React.FC<FiltersProps> = ({ setFilterSelected, filterSelected }) => {
  const filtersList: string[] = [
    'HTML',
    'CSS',
    'SCSS',
    'JS',
    'nodeJS',
    'ReactJs',
    'SEO',
    'Python',
    'Django',
    'testing',
    'algorithmes'
  ];

  return (
    <div className='btn_containers'>
      {filtersList.map((filter, index) => (
        <div key={index} onClick={() => setFilterSelected(filter)}>
          <button className='btn_filter'>{filter}</button>
        </div>
      ))}
    </div>
  );
};

export default Filters;