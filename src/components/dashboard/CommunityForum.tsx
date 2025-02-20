
import React from 'react';
import { Card } from "@/components/ui/card";
import { MessageCircle, ThumbsUp, User } from 'lucide-react';

interface ForumPost {
  id: number;
  author: string;
  content: string;
  likes: number;
  replies: number;
  timeAgo: string;
  tags: string[];
}

const CommunityForum = ({ cropName }: { cropName: string }) => {
  // Mock forum data - in a real app, this would come from an API
  const posts: ForumPost[] = [
    {
      id: 1,
      author: "FarmerJohn",
      content: `Best practices for ${cropName} cultivation in this season. I've found that...`,
      likes: 24,
      replies: 12,
      timeAgo: "2h ago",
      tags: ["Cultivation", "Seasonal"]
    },
    {
      id: 2,
      author: "AgroExpert",
      content: "Latest market trends show increasing demand. Consider...",
      likes: 18,
      replies: 8,
      timeAgo: "5h ago",
      tags: ["Market", "Trends"]
    },
    {
      id: 3,
      author: "LocalGrower",
      content: "Looking for advice on pest control methods...",
      likes: 15,
      replies: 20,
      timeAgo: "1d ago",
      tags: ["Pest Control", "Help"]
    }
  ];

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Community Forum</h3>
        <button className="text-sm text-primary hover:underline">New Post</button>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{post.author}</h4>
                    <p className="text-xs text-gray-500">{post.timeAgo}</p>
                  </div>
                  <div className="flex gap-2">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-2">{post.content}</p>
                <div className="flex gap-4 mt-3">
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary">
                    <ThumbsUp className="w-4 h-4" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary">
                    <MessageCircle className="w-4 h-4" />
                    {post.replies}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CommunityForum;
