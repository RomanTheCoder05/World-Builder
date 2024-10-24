import { useState } from 'react';

const DynamicForm = ({ selectedTag }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderFields = () => {
    switch (selectedTag) {
      case 'character':
        return (
          <>
            <input name="name" placeholder="Character Name" onChange={handleInputChange} />
            <input name="species" placeholder="Species" onChange={handleInputChange} />
          </>
        );
      case 'location':
        return <input name="locationName" placeholder="Location Name" onChange={handleInputChange} />;
      default:
        return <input name="defaultField" placeholder="Enter Details" onChange={handleInputChange} />;
    }
  };

  return <form>{renderFields()}</form>;
};

export default DynamicForm;
