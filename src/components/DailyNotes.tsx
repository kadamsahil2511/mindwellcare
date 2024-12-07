import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Save, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface JournalEntry {
  date: string;
  content: string;
  mood: string;
}

export const DailyNotes: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [mood, setMood] = useState<string>('neutral');
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const moods = ['😊 Happy', '😐 Neutral', '😔 Sad', '😤 Stressed', '😌 Calm'];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowCalendar(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // In a real app, this would load from a backend
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveEntry = () => {
    const newEntries = [...entries];
    const existingEntryIndex = entries.findIndex(e => e.date === selectedDate);

    if (existingEntryIndex >= 0) {
      newEntries[existingEntryIndex] = { date: selectedDate, content: currentEntry, mood };
    } else {
      newEntries.push({ date: selectedDate, content: currentEntry, mood });
    }

    setEntries(newEntries);
    localStorage.setItem('journalEntries', JSON.stringify(newEntries));
    alert('Journal entry saved successfully!');
  };

  const changeDate = (offset: number) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + offset);
    setSelectedDate(date.toISOString().split('T')[0]);
    loadEntry(date.toISOString().split('T')[0]);
  };

  const loadEntry = (date: string) => {
    const entry = entries.find(e => e.date === date);
    setCurrentEntry(entry?.content || '');
    setMood(entry?.mood || 'neutral');
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const generateCalendarDays = () => {
    const date = new Date(selectedDate);
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i).toISOString().split('T')[0];
      const hasEntry = entries.some(entry => entry.date === currentDate);
      days.push({ day: i, date: currentDate, hasEntry });
    }
    
    return days;
  };

  const handleExit = () => {
    if (showCalendar) {
      setShowCalendar(false);
    } else {
      window.location.hash = 'landing';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Daily Journal</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-2 text-blue-600 hover:text-blue-700"
            >
              <Calendar className="h-5 w-5" />
            </button>
            <button
              onClick={() => changeDate(-1)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">{selectedDate}</span>
            </div>
            <button
              onClick={() => changeDate(1)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={handleExit}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {showCalendar && (
          <div ref={calendarRef} className="absolute top-20 right-6 w-80 bg-white rounded-lg shadow-xl z-10 p-4">
            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-sm font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((day, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1">
                  {day && (
                    <button
                      onClick={() => loadEntry(day.date)}
                      className={`w-full h-full flex items-center justify-center rounded-md text-sm
                        ${day.hasEntry ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}
                        ${selectedDate === day.date ? 'ring-2 ring-blue-500' : ''}
                      `}
                    >
                      {day.day}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling today?
          </label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {moods.map((m) => (
              <option key={m} value={m.split(' ')[1].toLowerCase()}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Today's Thoughts
          </label>
          <textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            className="w-full h-64 p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your thoughts for today..."
          />
        </div>

        <button
          onClick={saveEntry}
          className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Entry
        </button>
      </div>
    </div>
  );
}; 