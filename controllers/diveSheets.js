import { DiveSheet } from '../models/diveSheet.js'
import { Profile } from '../models/profile.js'

async function index(req, res) {
  try {
    const profileId = req.params.profile;

    if([1, 2, 3].includes(req.user.role)) {
      const diveSheets = await DiveSheet.find({owner: profileId});
      res.status(200).json(diveSheets);
    } else {
        throw new Error('Unauthorized role');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


async function create(req, res) {
  try {
    const profile = await Profile.findById(req.params.profile)
    req.body.owner = profile
    const diveSheet = await DiveSheet.create(req.body)
    res.status(201).json(diveSheet)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


export {
  index,
  create,
}