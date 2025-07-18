import { Request, Response } from 'express';
import * as revenueService from '../services/revenue.service';

export const getLast7DaysRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const revenue = await revenueService.getLast7DaysRevenue();
    res.status(200).json(revenue);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching revenue', error });
  }
};

export const getTopSpendersList = async (req: Request, res: Response): Promise<void> => {
  try {
    const topSenders = await revenueService.getTopSpendersList();
    res.status(200).json(topSenders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top spenders list', error });
  }
};
