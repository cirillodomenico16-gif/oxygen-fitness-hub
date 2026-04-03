import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlayIcon,
  HeartIcon,
  StarIcon,
  ArrowRightIcon,
} from './PremiumIcons';
import './HomePage.css';

interface Workout {
  id: string;
  name: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  muscle: string;
  featured?: boolean;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredWorkouts, setFeaturedWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading featured workouts
    const mockWorkouts: Workout[] = [
      {
        id: '1',
        name: 'Power Push Day',
        duration: 45,
        difficulty: 'hard',
        muscle: 'Chest, Shoulders, Triceps',
        featured: true,
      },
      {
        id: '2',
        name: 'Leg Day Strength',
        duration: 50,
        difficulty: 'hard',
        muscle: 'Quads, Glutes, Hamstrings',
        featured: true,
      },
      {
        id: '3',
        name: 'Core & Cardio',
        duration: 30,
        difficulty: 'medium',
        muscle: 'Core, Cardiovascular',
        featured: true,
      },
    ];

    setTimeout(() => {
      setFeaturedWorkouts(mockWorkouts);
      setLoading(false);
    }, 300);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#10b981';
      case 'medium':
        return '#ffd700';
      case 'hard':
        return '#ff3d3d';
      default:
        return '#00d4ff';
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero__background">
          <div className="home-hero__blur-circle home-hero__blur-circle--1"></div>
          <div className="home-hero__blur-circle home-hero__blur-circle--2"></div>
        </div>

        <div className="home-hero__content">
          <h1 className="home-hero__title">
            Oxygen<span className="home-hero__title-accent">.</span>
          </h1>
          <p className="home-hero__subtitle">
            Your personal fitness journey starts here. Transform your body, elevate your mind.
          </p>

          <div className="home-hero__stats">
            <div className="home-stat">
              <div className="home-stat__value">42</div>
              <div className="home-stat__label">Workouts</div>
            </div>
            <div className="home-stat">
              <div className="home-stat__value">156</div>
              <div className="home-stat__label">Members</div>
            </div>
            <div className="home-stat">
              <div className="home-stat__value">4.8</div>
              <div className="home-stat__label">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Workouts Section */}
      <section className="home-featured">
        <div className="home-featured__header">
          <h2 className="home-featured__title">Featured Workouts</h2>
          <button
            className="home-featured__view-all"
            onClick={() => navigate('/workout')}
          >
            View all
            <ArrowRightIcon size={16} color="#00d4ff" />
          </button>
        </div>

        {loading ? (
          <div className="home-featured__skeleton">
            {[1, 2, 3].map((i) => (
              <div key={i} className="home-workout-card home-workout-card--skeleton">
                <div className="skeleton-element skeleton-element--image"></div>
                <div className="skeleton-element skeleton-element--title"></div>
                <div className="skeleton-element skeleton-element--text"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="home-featured__grid">
            {featuredWorkouts.map((workout, index) => (
              <div
                key={workout.id}
                className="home-workout-card"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="home-workout-card__header">
                  <div className="home-workout-card__difficulty">
                    <span
                      className="home-workout-card__difficulty-dot"
                      style={{
                        background: getDifficultyColor(workout.difficulty),
                      }}
                    ></span>
                    <span className="home-workout-card__difficulty-text">
                      {workout.difficulty.charAt(0).toUpperCase() +
                        workout.difficulty.slice(1)}
                    </span>
                  </div>
                  <button className="home-workout-card__favorite">
                    <HeartIcon size={20} color="#ff3d3d" withGradient />
                  </button>
                </div>

                <h3 className="home-workout-card__title">{workout.name}</h3>
                <p className="home-workout-card__muscle">{workout.muscle}</p>

                <div className="home-workout-card__footer">
                  <div className="home-workout-card__duration">
                    <span className="home-workout-card__duration-value">
                      {workout.duration}m
                    </span>
                  </div>
                  <button className="home-workout-card__start-btn">
                    <PlayIcon size={18} color="#ffffff" />
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Stats Section */}
      <section className="home-quick-stats">
        <div className="home-quick-stats__header">
          <h2 className="home-quick-stats__title">This Week</h2>
        </div>

        <div className="home-quick-stats__grid">
          <div className="home-quick-stat-box">
            <div className="home-quick-stat-box__icon">
              <PlayIcon size={24} color="#ff3d3d" withGradient />
            </div>
            <div className="home-quick-stat-box__content">
              <div className="home-quick-stat-box__value">5</div>
              <div className="home-quick-stat-box__label">Workouts</div>
            </div>
            <div className="home-quick-stat-box__progress">
              <div className="home-quick-stat-box__progress-bar">
                <div
                  className="home-quick-stat-box__progress-fill"
                  style={{ width: '65%' }}
                ></div>
              </div>
              <span className="home-quick-stat-box__progress-text">65%</span>
            </div>
          </div>

          <div className="home-quick-stat-box">
            <div className="home-quick-stat-box__icon">
              <StarIcon size={24} color="#ffd700" withGradient />
            </div>
            <div className="home-quick-stat-box__content">
              <div className="home-quick-stat-box__value">2,450</div>
              <div className="home-quick-stat-box__label">Calories Burned</div>
            </div>
            <div className="home-quick-stat-box__progress">
              <div className="home-quick-stat-box__progress-bar">
                <div
                  className="home-quick-stat-box__progress-fill"
                  style={{ width: '82%' }}
                ></div>
              </div>
              <span className="home-quick-stat-box__progress-text">82%</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="home-cta__content">
          <h2 className="home-cta__title">Ready for your next challenge?</h2>
          <p className="home-cta__description">
            Access premium workouts and personalized coaching today
          </p>
          <button
            className="home-cta__button"
            onClick={() => navigate('/workout')}
          >
            Explore Workouts
            <ArrowRightIcon size={18} color="#ffffff" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
