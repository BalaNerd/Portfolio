import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { GithubIcon } from './ui/Icons';

interface TelemetryStripProps {
  className?: string;
  variant?: 'hero' | 'footer';
}

const TelemetryStrip: React.FC<TelemetryStripProps> = ({ className = '', variant = 'hero' }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [latestPush, setLatestPush] = useState<{
    repo: string;
    branch: string;
    timeAgo: string;
    commitMessage?: string;
  }>({
    repo: 'BalaNerd/devmetrics',
    branch: 'main',
    timeAgo: 'Recently',
    commitMessage: 'feat: live telemetry & analytics',
  });

  // 1. Live Chennai, India (IST) clock updater
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setTimeStr(`${formatter.format(now)} IST`);
      } catch (err) {
        setTimeStr('IST UTC+5:30');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Client-side fetch of latest public GitHub push event
  useEffect(() => {
    let isMounted = true;

    const fetchLatestPush = async () => {
      try {
        const res = await fetch('https://api.github.com/users/BalaNerd/events/public', {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!res.ok) throw new Error('GitHub API rate limited or unavailable');

        const events = await res.json();
        if (Array.isArray(events)) {
          const pushEvent = events.find((e: any) => e.type === 'PushEvent');
          if (pushEvent && isMounted) {
            const repoName = pushEvent.repo?.name || 'BalaNerd/devmetrics';
            const refBranch = pushEvent.payload?.ref ? pushEvent.payload.ref.replace('refs/heads/', '') : 'main';
            const message = pushEvent.payload?.commits?.[0]?.message || 'Verified commit';
            const created = new Date(pushEvent.created_at);
            const diffHours = Math.round((Date.now() - created.getTime()) / (1000 * 60 * 60));
            const timeAgo = diffHours < 1 ? 'Just now' : diffHours < 24 ? `${diffHours}h ago` : `${Math.round(diffHours / 24)}d ago`;

            setLatestPush({
              repo: repoName,
              branch: refBranch,
              timeAgo,
              commitMessage: message.split('\n')[0].slice(0, 38),
            });
          }
        }
      } catch (err) {
        // Graceful fallback to static verified repo
        if (isMounted) {
          setLatestPush({
            repo: 'BalaNerd/devmetrics',
            branch: 'main',
            timeAgo: 'Verified',
            commitMessage: 'feat: luxury editorial telemetry',
          });
        }
      }
    };

    fetchLatestPush();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex flex-wrap items-center gap-2.5 sm:gap-3 p-1.5 px-3 rounded-xl border border-slate-900/10 bg-white/80 backdrop-blur-md shadow-2xs font-mono text-[11px] text-slate-600 ${className}`}
    >
      {/* Location & Live Clock */}
      <div className="flex items-center gap-2 pr-2.5 sm:border-r border-slate-200">
        <span className="flex items-center gap-1.5 font-medium text-slate-800 tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          CHENNAI, IN
        </span>
        <span className="text-slate-400">·</span>
        <span className="tabular-nums font-semibold text-slate-900 flex items-center gap-1">
          <Clock size={11} className="text-slate-400" />
          {timeStr || '15:00:00 IST'}
        </span>
      </div>

      {/* Latest GitHub Push Telemetry */}
      <a
        href="https://github.com/BalaNerd"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors group cursor-pointer"
        title={`Latest GitHub Push: ${latestPush.repo} (${latestPush.branch}) - ${latestPush.commitMessage}`}
      >
        <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200/80 text-[10px] font-semibold text-slate-700 flex items-center gap-1">
          <GithubIcon size={11} className="text-slate-600 group-hover:text-indigo-600 transition-colors" />
          <span>Latest Push</span>
        </span>
        <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate max-w-[170px] sm:max-w-[220px]">
          {latestPush.repo}
        </span>
        <span className="text-slate-400">({latestPush.branch})</span>
        <span className="px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium border border-emerald-200/60 hidden sm:inline-block">
          {latestPush.timeAgo}
        </span>
      </a>
    </motion.div>
  );
};

export default TelemetryStrip;
