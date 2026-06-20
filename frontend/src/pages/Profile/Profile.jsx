import { useState } from 'react'
import Topbar from '../../components/Topbar'
import { saveProfile } from '../../services/api'
import './Profile.css'

const SKILLS_OPTIONS = ['Python', 'JavaScript', 'Java', 'Docker', 'SQL', 'Machine Learning', 'React', 'Node.js', 'Kubernetes', 'C++']
const DOMAINS_OPTIONS = ['Web Development', 'Artificial Intelligence', 'Cybersecurity', 'Data Science', 'DevOps', 'Cloud Computing', 'Embedded Systems']
const EDUCATION_OPTIONS = ['Bachelor', 'Master', 'PhD', 'Bootcamp', 'Self-taught']
const EXPERIENCE_OPTIONS = ['Student', 'Junior (0-2 years)', 'Mid (2-5 years)', 'Senior (5+ years)']

export default function Profile() {
  const [form, setForm] = useState({
    skills: [],
    domains: [],
    education: '',
    experience: '',
    targetPosition: '',
    location: '',
    goals: '',
  })
  const [saved, setSaved] = useState(false)

  function toggleMulti(field, value) {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }))
  }

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  async function handleSave() {
    await saveProfile(form)
    setSaved(true)
  }

  return (
    <div className="profile-page">
      <Topbar />
      <div className="profile-content">
        <h2>Your profile</h2>
        <p className="profile-subtitle">This information helps tailor recommendations to your background and goals.</p>

        <section className="form-section">
          <label>Technical skills</label>
          <div className="tag-group">
            {SKILLS_OPTIONS.map(skill => (
              <button
                key={skill}
                className={`tag ${form.skills.includes(skill) ? 'tag-active' : ''}`}
                onClick={() => toggleMulti('skills', skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </section>

        <section className="form-section">
          <label>Domains of interest</label>
          <div className="tag-group">
            {DOMAINS_OPTIONS.map(domain => (
              <button
                key={domain}
                className={`tag ${form.domains.includes(domain) ? 'tag-active' : ''}`}
                onClick={() => toggleMulti('domains', domain)}
              >
                {domain}
              </button>
            ))}
          </div>
        </section>

        <section className="form-section">
          <label>Education level</label>
          <div className="tag-group">
            {EDUCATION_OPTIONS.map(opt => (
              <button
                key={opt}
                className={`tag ${form.education === opt ? 'tag-active' : ''}`}
                onClick={() => handleChange('education', opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

        <section className="form-section">
          <label>Experience level</label>
          <div className="tag-group">
            {EXPERIENCE_OPTIONS.map(opt => (
              <button
                key={opt}
                className={`tag ${form.experience === opt ? 'tag-active' : ''}`}
                onClick={() => handleChange('experience', opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

        <section className="form-section">
          <label>Target position</label>
          <input
            type="text"
            placeholder="e.g. Backend Developer, Data Scientist..."
            value={form.targetPosition}
            onChange={e => handleChange('targetPosition', e.target.value)}
          />
        </section>

        <section className="form-section">
          <label>Location</label>
          <input
            type="text"
            placeholder="e.g. Netherlands, Remote..."
            value={form.location}
            onChange={e => handleChange('location', e.target.value)}
          />
        </section>

        <section className="form-section">
          <label>Career goals</label>
          <textarea
            placeholder="Briefly describe your short or long-term career goals..."
            value={form.goals}
            onChange={e => handleChange('goals', e.target.value)}
            rows={3}
          />
        </section>

        <div className="save-row">
          <button className="save-btn" onClick={handleSave}>
            Save profile
          </button>
          {saved && <span className="saved-msg">✓ Saved</span>}
        </div>
      </div>
    </div>
  )
}
