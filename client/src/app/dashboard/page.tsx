'use client';
import { useAuth } from '@/lib/AuthContext';
import {
  FiUser,
  FiMail,
  FiTag,
  FiAward,
  FiUserCheck,
  FiUsers,
  FiClock,
  FiRefreshCw,
  FiShield,
} from 'react-icons/fi';

const InfoCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition">
    <div className="bg-gray-700 p-2 rounded-full">
      <Icon className="text-white text-xl" />
    </div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <div className="text-white font-semibold">{value}</div>
    </div>
  </div>
);

export default function DashboardHomePage() {
  const { user } = useAuth();

  if (!user) return <p className="text-white">Loading user data...</p>;

  const isEligible = user.rewardPoints >= 1000;
  const rewardValue = user.rewardPoints;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>
      <p className="mb-6 text-gray-300">
        Welcome back,{' '}
        <span className="font-semibold text-white">
          {user.fullName || user.username}
        </span>
        !
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <InfoCard icon={FiUser} label="Username" value={user.username} />
        <InfoCard icon={FiMail} label="Email" value={user.email} />
        <InfoCard icon={FiUserCheck} label="Full Name" value={user.fullName} />
        <InfoCard icon={FiShield} label="Role" value={user.role} />
        <InfoCard icon={FiTag} label="Referral Code" value={user.referralCode} />
        <InfoCard
          icon={FiUsers}
          label="Referred By"
          value={user.referredBy || 'None'}
        />
        <InfoCard
          icon={FiAward}
          label="Reward Points"
          value={
            <>
              {rewardValue} pts
              <br />
              <span className="text-green-400">₹{rewardValue}</span>
              <br />
              {isEligible ? (
                <span className="text-green-500 font-medium">
                  Eligible for Withdrawal
                </span>
              ) : (
                <span className="text-yellow-400 text-sm">
                  Earn {1000 - rewardValue} more points to withdraw
                </span>
              )}
            </>
          }
        />
        <InfoCard
          icon={FiClock}
          label="Created At"
          value={new Date(user.createdAt).toLocaleString()}
        />
        <InfoCard
          icon={FiRefreshCw}
          label="Updated At"
          value={new Date(user.updatedAt).toLocaleString()}
        />
      </div>
    </div>
  );
}
