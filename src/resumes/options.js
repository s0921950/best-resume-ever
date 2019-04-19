// import yaml from 'js-yaml';
import axios from 'axios';
/*import {
    PERSON
} from '../../resume/data.yml';*/
import {
    terms
} from '../terms';

// Called by templates to decrease redundancy
function getVueOptions (name) {
    const opt = {
        name: name,
        data () {
            return {
                // person: yaml.load(PERSON),
                terms: terms,
                person: {
                    'name': {
                        'first': '',
                        'middle': '',
                        'last': ''
                    },
                    'contact': {
                        'email': '',
                        'phone': '',
                        'phone2': '',
                        'street': '',
                        'city': '',
                        'website': '',
                        'github': ''
                    },
                    'birth': {
                        'year': '',
                        'location': ''
                    },
                },
            };
        },
        mounted () {
            axios.get('https://yuhuatung-api.herokuapp.com/data').then(response => (this.person = response.data.data[0]));
        },
        computed: {
            lang () {
                const defaultLang = this.terms.en;
                if(this.person.lang) {
                    const useLang = this.terms[this.person.lang];

                    // overwrite non-set fields with default lang
                    Object.keys(defaultLang)
                        .filter(k => !useLang[k])
                        .forEach(k => {
                            console.log(k);
                            useLang[k] = defaultLang[k];
                        });
                    return useLang;
                }
                return defaultLang;
            },

            contactLinks() {
                const links = {};

                if(this.person.contact.github) {
                    links.github = `https://github.com/${this.person.contact.github}`;
                }

                if(this.person.contact.codefights) {
                    links.codefights = `https://codefights.com/profile/${this.person.contact.codefights}`;
                }

                if(this.person.contact.medium) {
                    links.medium = `https://medium.com/@${this.person.contact.medium}`;
                }

                if(this.person.contact.email) {
                    links.email = `mailto:${this.person.contact.email}`;
                }

                if(this.person.contact.linkedin) {
                    links.linkedin = `https://linkedin.com/in/${this.person.contact.linkedin}`;
                }

                if(this.person.contact.phone) {
                    links.phone = `tel:${this.person.contact.phone}`;
                }

                if(this.person.contact.phone2) {
                    links.phone2 = `tel:${this.person.contact.phone2}`;
                }

                if(this.person.contact.website) {
                    links.website = `https://${this.person.contact.website}`;
                }

                return links;
            },
        }
    };
    return opt;
}

export {
    getVueOptions
};
