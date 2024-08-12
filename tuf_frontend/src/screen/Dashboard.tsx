import React, { useState, ChangeEvent, FormEvent } from 'react';
import { modifyBannerDetails } from '../apis/banner';
import { type BannerUpdateData } from '../types/BannerUpdateData';
import '../css/Dashboard.css';

const Dashboard: React.FC = () => {
  const [banner, setBanner] = useState<BannerUpdateData>({
    Description: '',
    ValidTill: new Date(),
    Link: '',
    IsVisible: true
  });
  const [error, setError] = useState<string | null>(null);

  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBanner(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'ValidTill' ? new Date(value) : value),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await modifyBannerDetails(banner, 1);
      alert('Banner updated successfully!');
      setError(null);
      setBanner({
        Description: '',
        ValidTill: new Date(),
        Link: '',
        IsVisible: true
      })
    } catch (error) {
      setError(`${(error)}`);
    }
  };




  return (
    <div className="dashboard">
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            name="Description"
            value={banner.Description}
            onChange={handleChange}
          />
        </label>
        <label>
          Valid Till:
          <input
            type="datetime-local"
            name="ValidTill"
            value={formatDateForInput(banner.ValidTill)}
            onChange={handleChange}
          />
        </label>
        <label>
          Link:
          <input
            type="text"
            name="Link"
            value={banner.Link}
            onChange={handleChange}
          />
        </label>
        <label>
          Visible:
          <input
            type="checkbox"
            name="IsVisible"
            checked={banner.IsVisible}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Banner</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Dashboard;
