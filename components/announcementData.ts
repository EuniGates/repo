import React from 'react';

export interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
  isArchived: boolean;
}

// This acts as a simple in-memory database for the demo.
export let announcementsData: Announcement[] = [
    { id: 1, title: 'Holiday Hours Update', date: 'Dec 15, 2024', content: 'Please note our manufacturing plant will be closed from December 24th to January 2nd. Please plan your orders accordingly.', isArchived: false },
    { id: 2, title: 'New Vinyl Color: "Ocean Blue"', date: 'Nov 28, 2024', content: 'We are excited to announce a new marine-grade vinyl color, Ocean Blue, is now available for all Spa Cover orders!', isArchived: false },
];