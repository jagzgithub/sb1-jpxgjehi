import React from 'react';
import { Upload, Calendar, MapPin, Users } from 'lucide-react';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { Alert } from '../../Alert';
import { useMatchUpload } from '../../../hooks/admin/useMatchUpload';

export function MatchUploadForm() {
  const { uploadMatch, isLoading, error, success } = useMatchUpload();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await uploadMatch({
      opponent: formData.get('opponent') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      location: formData.get('location') as string,
      maxPlayers: Number(formData.get('maxPlayers')),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message="Match uploaded successfully!" />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Opponent Team"
          name="opponent"
          icon={<Users className="w-5 h-5 text-gray-400" />}
          required
          placeholder="Enter opponent team name"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date"
            name="date"
            type="date"
            icon={<Calendar className="w-5 h-5 text-gray-400" />}
            required
            min={new Date().toISOString().split('T')[0]}
          />
          
          <Input
            label="Time"
            name="time"
            type="time"
            required
          />
        </div>

        <Input
          label="Location"
          name="location"
          icon={<MapPin className="w-5 h-5 text-gray-400" />}
          required
          placeholder="Enter match location"
        />

        <Input
          label="Maximum Players"
          name="maxPlayers"
          type="number"
          min="1"
          max="50"
          defaultValue="12"
          required
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        <Upload className="w-4 h-4 mr-2" />
        {isLoading ? 'Uploading...' : 'Upload Match'}
      </Button>
    </form>
  );
}