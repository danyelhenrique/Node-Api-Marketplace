const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const filters = {}

    if (req.query.price_min || req.query.price_max) {
      filters.price = {}

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }
      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }
    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      populate: ['author'],
      sort: '-createdAt'
    })

    return res.json(ads)
  }

  async show (req, res) {
    const { id } = req.params

    const ad = await Ad.findById(id)

    return res.json(ad)
  }

  async store (req, res) {
    const author = req.userId

    const ad = await Ad.create({ ...req.body, author })
    return res.json(ad)
  }

  async update (req, res) {
    const { id } = req.params

    const ad = await Ad.findByIdAndUpdate(id, req.body, {
      new: true
    })
    return res.json(ad)
  }

  async destroy (req, res) {
    const { id } = req.params

    await Ad.findByIdAndDelete(id)

    return res.json({ sucess: true })
  }
}

module.exports = new AdController()
