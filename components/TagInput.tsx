'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[]; // 既存タグ候補
}

export default function TagInput({ tags, onChange, placeholder = 'Add a tag...', suggestions = [] }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // タグを追加する関数
  const addTag = (tag: string) => {
    // 空のタグは追加しない
    if (!tag.trim()) return;
    
    // 既に存在するタグは追加しない
    if (tags.includes(tag.trim())) return;
    
    // タグを追加して入力値をクリア
    onChange([...tags, tag.trim()]);
    setInputValue('');
  };

  // タグを削除する関数
  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  // キーボードイベントの処理
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault(); // デフォルトのフォーム送信とフォーカス移動を防止
      addTag(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      // Backspaceで最後のタグを削除
      removeTag(tags.length - 1);
    }
  };

  // コンテナをクリックしたら入力欄にフォーカス
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // 入力欄外クリック時にフォーカスが当たるようマウント時にイベントを設定
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('click', handleContainerClick);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('click', handleContainerClick);
      }
    };
  }, []);

  const availableSuggestions = suggestions.filter(
    (s) => s.toLowerCase().includes(inputValue.toLowerCase()) && !tags.includes(s)
  ).slice(0, 5);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 bg-white min-h-[42px]"
    >
      {tags.map((tag, index) => (
        <div 
          key={index} 
          className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm"
        >
          <span>{tag}</span>
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
            aria-label={`Remove tag ${tag}`}
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          // フォーカスを外れた時に入力中のタグを追加
          if (inputValue.trim()) {
            addTag(inputValue);
          }
        }}
        className="flex-grow min-w-[120px] outline-none border-none bg-transparent text-sm text-gray-900 placeholder-gray-400"
        placeholder={tags.length === 0 ? placeholder : ''}
      />

      {inputValue && availableSuggestions.length > 0 && (
        <ul className="absolute left-0 top-full mt-1 w-full max-h-40 overflow-auto border border-gray-200 rounded-md bg-white shadow-lg z-10">
          {availableSuggestions.map((s, idx) => (
            <li
              key={idx}
              className="px-3 py-2 hover:bg-indigo-50 cursor-pointer text-sm text-gray-900"
              onMouseDown={(e) => {
                // onMouseDown にしないと blur で input が失われる
                e.preventDefault();
                addTag(s);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 