const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    if (!purchaseAd) {
      return res.status(400).json({ err: 'Fail to send mail.' })
    }

    await Mail.sendMail({
      from: '"Danyel Henrique" <danyelhenriquefidel@gmail.com>',
      to: purchaseAd.author.email,
      subject: `purchase request: ${purchaseAd.title}`,
      html: `<p>teste ${content}</p>`
    })
    return res.json({ ok: true })
  }
}

module.exports = new PurchaseController()
