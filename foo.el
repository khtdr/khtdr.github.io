(defvar foo-mode-map
  (let ((map (make-sparse-keymap)))
    (define-key map (kbd "C-c C-c") 'foo-increment-count)
    map)
  "Keymap for foo-mode.")

(defvar-local foo-count 0
  "Counter for number of clicks in the current buffer.")

(define-derived-mode foo-mode fundamental-mode "Foo"
  "Major mode for .foo files with a clickable counter."
  (setq-local foo-count 0)
  (foo-mode-refresh))

(defun foo-increment-count ()
  "Increment the counter and refresh the display."
  (interactive)
  (setq foo-count (1+ foo-count))
  (foo-mode-refresh))

(defun foo-mode-refresh ()
  "Refresh the buffer display."
  (let ((inhibit-read-only t))
    (erase-buffer)
    (insert (format "Count: %d\n\n" foo-count))
    (insert-button "Click me!"
                   'action (lambda (_) (foo-increment-count))
                   'follow-link t)))

(defun foo-mode-save ()
  "Save the count to the file."
  (when (buffer-file-name)
    (let ((count foo-count))
      (write-region (number-to-string count) nil (buffer-file-name)))))

(defun foo-mode-load ()
  "Load the count from the file."
  (when (and (buffer-file-name)
             (file-exists-p (buffer-file-name)))
    (setq foo-count
          (string-to-number
           (with-temp-buffer
             (insert-file-contents (buffer-file-name))
             (buffer-string))))
    (foo-mode-refresh)))

(add-hook 'find-file-hook
          (lambda ()
            (when (eq major-mode 'foo-mode)
              (foo-mode-load))))
(add-hook 'after-save-hook
          (lambda ()
            (when (eq major-mode 'foo-mode)
              (foo-mode-save)
              (foo-mode-refresh))))

(add-to-list 'auto-mode-alist '("\\.foo\\'" . foo-mode))

(provide 'foo-mode)
