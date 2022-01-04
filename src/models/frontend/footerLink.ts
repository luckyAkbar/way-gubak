import mongoose, { Schema } from 'mongoose';
import FooterLinkAttr from '../../interface/pageResource/footer';

const footerLink: Schema = new mongoose.Schema<FooterLinkAttr>({
  links: Array,
});

const FooterLinkModel = mongoose.model('FooterLink', footerLink);

export default FooterLinkModel;
